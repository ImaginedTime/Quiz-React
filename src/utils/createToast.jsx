import { toast } from "react-toastify";

const createToast = (text) => {
    toast.dismiss();
    toast.warn(text , {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

export default createToast;