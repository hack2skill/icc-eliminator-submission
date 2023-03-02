import 'package:agora_video/utils/app_methods.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/cupertino.dart';

// ignore: import_of_legacy_library_into_null_safe

import 'package:http/http.dart';
import 'package:walletconnect_dart/walletconnect_dart.dart';
import 'package:web3dart/web3dart.dart';

import '../../../../utils/app_strings.dart';

part 'verify_event.dart';

part 'verify_state.dart';

class VerifyBloc extends Bloc<VerifyEvent, VerifyState> {
  SessionStatus? sessionStatus;
  String? address;
  int? chainId;
  late bool isInstalled;

  late Client httpClient;
  late Web3Client web3client;

  Map<String, String> allTokens = {};
  Map<String, String> unVerifiedTokens = {};

  String? get walletAddress => address;

  VerifyBloc() : super(const MetamaskInitial()) {
    on<VerifyEvent>((event, emit) async {
      if (event is ConnectWallet) {
        emit(const WalletConnecting());
        isInstalled = true;
        if (isInstalled) {
          await connectWallet();
          emit(const WalletConnected());
          print(sessionStatus!.chainId);
          if (sessionStatus!.chainId == 137) {
            if (await verifyToken()) {
              emit(const TokenVerified());
            } else {
              emit(const TokenNotVerified());
            }
          } else {
            emit(const WrongNetwork());
          }
        } else {
          emit(const AppNotInstalled());
        }
      }
    });
  }

  Future<void> connectWallet() async {
    final connector = WalletConnect(
      bridge: 'https://bridge.walletconnect.org',
      clientMeta: const PeerMeta(
        name: 'UnitasLink',
        description: 'UnitasLink Developer App',
        url: 'https://unitaslink.com/',
        icons: [
          'https://unitaslink.com/wp-content/uploads/2022/05/SiteLogo.png'
        ],
      ),
    );

    // Subscribe to events
    connector.on('connect', (session) {
      debugPrint("connect: $session");

      address = sessionStatus?.accounts[0];
      chainId = sessionStatus?.chainId;

      debugPrint("Address: ${address!}");
      debugPrint("Chain Id: $chainId");
    });

    connector.on('session_request', (payload) {
      debugPrint("session request: $payload");
    });

    connector.on('disconnect', (session) {
      debugPrint("disconnect: $session");
    });

    // Create a new session
    if (!connector.connected) {
      sessionStatus = await connector.createSession(
        chainId: 137,
        onDisplayUri: (uri) {
          AppMethods.openUrl(uri);
        },
      );
    }
  }

  Future<bool> verifyToken() async {
    bool flag = true;
    httpClient = Client();
    web3client = Web3Client(AppStrings.endPointURL, httpClient);

    EthereumAddress ethereumAddress =
        EthereumAddress.fromHex(sessionStatus!.accounts[0]);

    var token = BigInt.parse(
        '107949229547521970898568846621117350688224786224499613327583753547784491468448');

    var result = await AppMethods.query(
      web3client: web3client,
      functionName: "balanceOf",
      args: [ethereumAddress, token],
      contractJson: "assets/token.json",
      contractName: "Token",
      contractAddress: AppStrings.verifyContractAddress,
    );

    if (result[0].toString() == "0") {
      flag = false;
    }
    print(flag);
    return flag;
  }

//   Future<bool> isAppInstalled() async {
//     if (Platform.isAndroid) {
//       try {
//         var installedApp =
//             await AppAvailability.checkAvailability("io.metamask");
//         if (installedApp.containsValue("io.metamask")) {
//           return true;
//         }
//       } catch (e) {
//         return false;
//       }
//     } else if (Platform.isIOS) {
//       return true;
//       /*try {
//         //https://apps.apple.com/in/app/metamask-blockchain-wallet/id1438144202
//         var installedApp =
//             await AppAvailability.checkAvailability("io.metamask://");
//         print("APP AVAIBILITY -- ${installedApp}");
//         if (installedApp.containsValue("io.metamask://")) {
//           return true;
//         }
//         return true;
//       } catch (e) {

//         return false;
//       }*/
//     }
//     return false;
//   }
}
