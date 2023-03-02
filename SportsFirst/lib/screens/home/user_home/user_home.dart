import 'dart:io';

import 'package:agora_video/screens/home/user_home/bloc/verify_bloc.dart';
import 'package:agora_video/utils/app_colors.dart';
import 'package:agora_video/utils/app_methods.dart';
import 'package:agora_video/utils/app_strings.dart';
import 'package:agora_video/widgets/app_drawer.dart';
import 'package:agora_video/widgets/appbar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../widgets/custom_button.dart';
import '../../details_page/stream_details.dart';

class UserHomePage extends StatelessWidget {
  const UserHomePage({
    Key? key,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: HomeAppBar(hasTabs: false),
      drawer: const AppDrawer(),
      body: SafeArea(
        child: Scaffold(
          body: Padding(
            padding: const EdgeInsets.only(top: 42, left: 22, right: 22),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                buildTitleText(),
                buildUsernameText(),
                const SizedBox(height: 32),
                buildExperienceText(),
                const SizedBox(height: 32),
                const ConnectButton(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget buildExperienceText() {
    return Text(
      AppStrings.linkText,
      style: const TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: 24,
      ),
    );
  }

  Widget buildTitleText() {
    return Text(
      AppStrings.welcome,
      style: const TextStyle(
        color: Colors.black,
        fontWeight: FontWeight.bold,
        fontSize: 32,
      ),
    );
  }

  Widget buildUsernameText() {
    return Text(
      AppMethods.getUsername()!,
      style: TextStyle(
        color: AppColors.primaryColor,
        fontWeight: FontWeight.bold,
        fontSize: 36,
      ),
    );
  }
}

class ConnectButton extends StatelessWidget {
  const ConnectButton({
    Key? key,
  }) : super(key: key);
  Future<void> _launchUrl() async {
    if (!await launchUrl(Uri.parse(
        "https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/107949229547521970898568846621117350688224786224499613327583753547784491468448"))) {
      throw Exception(
          'Could not launch https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/107949229547521970898568846621117350688224786224499613327583753547784491468448');
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<VerifyBloc, VerifyState>(
      listener: (context, state) {
        if (state is TokenVerified) {
          Navigator.of(context).push(
            CupertinoPageRoute(
              builder: (context) => StreamDetails(
                date: DateTime.now(),
                channelName: "EKNjMxJOv9A3VhhAqFvZ",
                isBroadcaster: false,
                guideName: 'Toni Greg',
                description:
                    "Commentary in Hindi, with lot of humour and insights",
                eventName: "India vs Australia Third Test",
                imageLink: AppStrings.defaultImageUrl,
              ),
            ),
          );
        }
      },
      builder: (context, state) {
        if (state is WalletConnecting || state is WalletConnected) {
          return const Center(child: CircularProgressIndicator());
        }
        if (state is WalletConnected) {
          // return Container(
          //   child: const Text("Token Verified"),
          // );
          debugPrint("Connected-------------------------=>");
        }
        if (state is AppNotInstalled) {
          return const WalletNotInstalledWidget();
        }
        if (state is WrongNetwork) {
          return const WrongNetworkWidget();
        }
        if (state is TokenVerified) {
          return Container(
            child: const Text("Token   Verified"),
          );
        }
        if (state is TokenNotVerified) {
          return Container(
            child: Column(
              children: [
                Wrap(
                  children: [
                    const Text(
                        "You don’t have the watch party NFT. In order to attend the watch party buy the NFT from here:"),
                    TextButton(
                        onPressed: () {
                          _launchUrl();
                        },
                        child: const Text("Click here")),
                  ],
                ),
                const SizedBox(
                  height: 10,
                ),
                CustomButton(
                  text: AppStrings.tryAgain,
                  onPressed: () {
                    BlocProvider.of<VerifyBloc>(context)
                        .add(const ConnectWallet());
                  },
                )
              ],
            ),
          );
        }
        return Center(
          child: CustomButton(
            text: AppStrings.conectButton,
            onPressed: () {
              BlocProvider.of<VerifyBloc>(context).add(const ConnectWallet());
            },
          ),
        );
      },
    );
  }
}

class WalletNotInstalledWidget extends StatelessWidget {
  const WalletNotInstalledWidget({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          AppStrings.walletNotInstalled,
          style: const TextStyle(
            color: Colors.white70,
            fontWeight: FontWeight.w600,
            fontSize: 20,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 12),
        InkWell(
          onTap: () {
            if (Platform.isAndroid) {
              AppMethods.openUrl(AppStrings.metaMaskDownloadURLAndroid);
            } else if (Platform.isIOS) {
              AppMethods.openUrl(AppStrings.metaMaskDownloadURLiOS);
            }
          },
          child: Text(
            AppStrings.installWallet,
            style: TextStyle(
              color: AppColors.secondaryColor,
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
          ),
        ),
      ],
    );
  }
}

class WrongNetworkWidget extends StatelessWidget {
  const WrongNetworkWidget({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          AppStrings.wrongNetwork,
          style: const TextStyle(
            color: Colors.white70,
            fontWeight: FontWeight.w600,
            fontSize: 20,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 12),
        CustomButton(
          text: AppStrings.tryAgain,
          onPressed: () {
            BlocProvider.of<VerifyBloc>(context).add(const ConnectWallet());
          },
        ),
      ],
    );
  }
}

class TokenVerifiedText extends StatelessWidget {
  const TokenVerifiedText({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      AppStrings.verifiedText,
      style: const TextStyle(
        color: Colors.white70,
        fontWeight: FontWeight.w600,
        fontSize: 20,
      ),
      textAlign: TextAlign.center,
    );
  }
}

class TokenNotVerifiedWidget extends StatelessWidget {
  final Map<String, String> unVerifiedTokens;
  const TokenNotVerifiedWidget({
    Key? key,
    required this.unVerifiedTokens,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List unVerifiedList = unVerifiedTokens.keys.toList();
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          AppStrings.notVerifiedText,
          style: const TextStyle(
            color: Colors.white70,
            fontWeight: FontWeight.w600,
            fontSize: 20,
          ),
          textAlign: TextAlign.center,
        ),
        NoNFTList(unVerifiedList: unVerifiedList),
      ],
    );
  }
}

class NoNFTList extends StatelessWidget {
  const NoNFTList({
    Key? key,
    required this.unVerifiedList,
  }) : super(key: key);

  final List unVerifiedList;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.textFieldColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListView.builder(
        shrinkWrap: true,
        padding: EdgeInsets.zero,
        itemCount: unVerifiedList.length,
        itemBuilder: (context, index) {
          return Row(
            children: [
              Icon(
                Icons.close_rounded,
                color: AppColors.secondaryColor,
              ),
              const SizedBox(width: 12),
              Text(
                unVerifiedList[index],
                style: const TextStyle(
                  color: Colors.white70,
                  fontWeight: FontWeight.w600,
                  fontSize: 20,
                ),
                textAlign: TextAlign.left,
              ),
            ],
          );
        },
      ),
    );
  }
}
