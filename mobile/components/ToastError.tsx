import Toast from "react-native-root-toast";

interface ApiError {
  errors: string[]
}

export const ToastError = (message: string | ApiError ) => {
  var errorMessage = 'Ocorreu um erro, tente novamente mais tarde.'
  if(typeof message === 'object') {
    if(Object.hasOwn(message, 'errors'))
      errorMessage = message.errors[0]
  }
  Toast.show(errorMessage, {
    duration: Toast.durations.LONG,
  });
}
