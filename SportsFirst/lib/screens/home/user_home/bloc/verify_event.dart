part of 'verify_bloc.dart';

abstract class VerifyEvent extends Equatable {
  const VerifyEvent();

  @override
  List<Object> get props => [];
}

class ConnectWallet extends VerifyEvent {
  const ConnectWallet();

  @override
  List<Object> get props => [];
}
