import { useToast, UseToastOptions } from "@chakra-ui/react";

const useCustomToast = (): ((
  options: UseToastOptions
) => string | number | undefined) => {
  const toast = useToast({
    position: "top",
    containerStyle: {
      width: "80%",
    },
    duration: 2000,
    isClosable: true,
  });

  return toast;
};

export default useCustomToast;
