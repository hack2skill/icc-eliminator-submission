import 'dart:io';
import 'dart:math';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_branch_sdk/flutter_branch_sdk.dart';
import 'package:share_plus/share_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:url_launcher/url_launcher_string.dart';
import 'package:web3dart/web3dart.dart';

class AppMethods {
  static String? getUsername() {
    return FirebaseAuth.instance.currentUser?.displayName;
  }

  static String? getUid() {
    return FirebaseAuth.instance.currentUser?.uid;
  }

  static String? getProfileUrl() {
    return FirebaseAuth.instance.currentUser?.photoURL;
  }

  static String? getEmail() {
    return FirebaseAuth.instance.currentUser?.email;
  }

  static const String _chars =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';

  static final Random _rnd = Random();

  static String getRandomString(int length) {
    return String.fromCharCodes(
      Iterable.generate(
        length,
        (_) => _chars.codeUnitAt(
          _rnd.nextInt(_chars.length),
        ),
      ),
    );
  }

  static String randomPictureUrl() {
    final randInt = _rnd.nextInt(1000);
    return 'http://picsum.photos/seed/$randInt/300/300';
  }

  static Future<DocumentSnapshot<Map<String, dynamic>>?> getStreamFromFirebase({
    required String channelName,
    required String userId,
  }) async {
    try {
      var doc = await FirebaseFirestore.instance
          .collection("broadcasts")
          .doc(userId)
          .collection("events")
          .doc(channelName)
          .get();
      if (doc.exists) {
        return doc;
      } else {
        return null;
      }
    } catch (e) {
      if (kDebugMode) {
        print("Error in fetching stream data $e");
        return null;
      }
    }
    return null;
  }

  static Future<String?> uploadImageToFirebase(
      File image, String channelName) async {
    try {
      TaskSnapshot task = await FirebaseStorage.instance
          .ref()
          .child("images/")
          .child("$channelName/")
          .putFile(image);
      return await task.ref.getDownloadURL();
    } catch (e) {
      if (kDebugMode) {
        print("Upload error $e");
      }
      return null;
    }
  }

  static Future<String?> getGameBranchLink({
    required String channelName,
  }) async {
    BranchUniversalObject branchUniversalObject = BranchUniversalObject(
      canonicalIdentifier: 'flutter/branch',
      contentMetadata: BranchContentMetaData()
        ..addCustomMetadata("channel_name", channelName)
        ..addCustomMetadata("user_id", AppMethods.getUid()!),
    );
    BranchLinkProperties linkProperties = BranchLinkProperties();
    linkProperties.addControlParam('url', 'http://www.google.com');

    BranchResponse response = await FlutterBranchSdk.getShortUrl(
      buo: branchUniversalObject,
      linkProperties: linkProperties,
    );

    if (response.success) {
      if (kDebugMode) {
        print(response.result);
      }
      return response.result;
    } else {
      if (kDebugMode) {
        print(
            'Error in getting shorturl: ${response.errorCode} - ${response.errorMessage}');
      }
      return null;
    }
  }

  static int calculateDifference(DateTime date) {
    DateTime now = DateTime.now();
    return DateTime(date.year, date.month, date.day)
        .difference(DateTime(now.year, now.month, now.day))
        .inDays;
  }

  static bool isEventNow(DateTime date) {
    DateTime now = DateTime.now();
    if (now.isAfter(date)) {
      return true;
    }
    return false;
  }

  static Future<void> setUserTypePrefs(
      {required SharedPreferences prefs, required bool isAgent}) async {
    await prefs.setBool("IS_AGENT", isAgent);
  }

  static bool getUserTypePrefs({required SharedPreferences prefs}) {
    return prefs.getBool("IS_AGENT")!;
  }

  static Future<void> removeUserTypePrefs(
      {required SharedPreferences prefs}) async {
    await prefs.remove("IS_AGENT");
  }

  static Future<bool> addUserToFirebase(String email) async {
    try {
      await FirebaseFirestore.instance
          .collection("users")
          .doc(email)
          .set({'email': email}).then((value) => true);
    } catch (e) {
      if (kDebugMode) {
        print("Error in adding user: $e");
      }
      return false;
    }
    return false;
  }

  static Future<bool> checkUserType() async {
    try {
      var doc = await FirebaseFirestore.instance
          .collection("users")
          .doc(AppMethods.getEmail())
          .get();
      if (!doc.exists) {
        return true;
      }
      return false;
    } catch (e) {
      if (kDebugMode) {
        print("Error checking user type: $e");
      }
      return false;
    }
  }

  static shareLink(String link) {
    Share.share(link);
  }

  static Future<void> openUrl(String url) async {
    Uri uri = Uri.parse(url);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      throw 'Could not launch $uri';
    }
  }

  static Future<dynamic> query({
    required Web3Client web3client,
    required String functionName,
    required List<dynamic> args,
    required String contractJson,
    required String contractName,
    required String contractAddress,
  }) async {
    final contract = await loadContract(
      contractJson: contractJson,
      contractName: contractName,
      contractAddress: contractAddress,
    );
    final ethFunction = contract.function(functionName);
    final result = await web3client.call(
      contract: contract,
      function: ethFunction,
      params: args,
    );

    return result;
  }

  static Future<DeployedContract> loadContract({
    required String contractJson,
    required String contractName,
    required String contractAddress,
  }) async {
    String abi = await rootBundle.loadString(contractJson);

    final contract = DeployedContract(
      ContractAbi.fromJson(abi, contractName),
      EthereumAddress.fromHex(contractAddress),
    );
    return contract;
  }
}
