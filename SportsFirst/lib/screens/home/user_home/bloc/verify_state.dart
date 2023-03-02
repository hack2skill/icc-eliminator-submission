part of 'verify_bloc.dart';

abstract class VerifyState extends Equatable {
  const VerifyState();

  @override
  List<Object> get props => [];
}

class MetamaskInitial extends VerifyState {
  const MetamaskInitial();

  @override
  List<Object> get props => [];
}

class WalletConnecting extends VerifyState {
  const WalletConnecting();

  @override
  List<Object> get props => [];
}

class WalletConnected extends VerifyState {
  const WalletConnected();

  @override
  List<Object> get props => [];
}

// class WalletNotConnected extends VerifyState {
//   const WalletNotConnected();

//   @override
//   List<Object> get props => [];
// }

class TokenVerified extends VerifyState {
  const TokenVerified();

  @override
  List<Object> get props => [];
}

class TokenNotVerified extends VerifyState {
  const TokenNotVerified();

  @override
  List<Object> get props => [];
}

class WrongNetwork extends VerifyState {
  const WrongNetwork();

  @override
  List<Object> get props => [];
}

class AppNotInstalled extends VerifyState {
  const AppNotInstalled();

  @override
  List<Object> get props => [];
}
