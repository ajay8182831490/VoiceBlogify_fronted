import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Notify = (msg) => toast.success(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"

});
const NotifyFalse = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"

});

export { Notify, NotifyFalse }