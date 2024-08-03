import {useSelector} from "react-redux/es/hooks/useSelector";
import {RootState} from "../../state/PlayerStore";
import axios from "axios";
import {useState} from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../ui/alert-dialog";
import {Button} from "../ui/button";
import {useDispatch} from "react-redux";
import {setModal} from "../../state/uiSlice";

const SelectWordModal = () => {
  const apiUrl = import.meta.env.VITE_SOCKET_IO_URL || "http://localhost:5000";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {id: roomId} = useSelector((state: RootState) => state.game.room);
  const {id} = useSelector((state: RootState) => state.player);
  const {targetWordOptions} = useSelector((state: RootState) => state.ui);

  const onSelectOption = async (index: number) => {
    try {
      setLoading(true);
      await axios.post(`${apiUrl}/api/guess/selectTargetWord`, {
        wordIndex: index,
        roomId: roomId,
        playerId: id
      });
      dispatch(setModal(false));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center">
          Your turn to pick a word!
        </AlertDialogTitle>
      </AlertDialogHeader>
      <div className="flex justify-between">
        {targetWordOptions.map((item, key) => (
          <Button
            disabled={loading}
            className="bg-sky-300 active:bg-sky-500 hover:bg-sky-500 rounded-full"
            key={key}
            onClick={() => onSelectOption(key)}
          >
            {item}
          </Button>
        ))}
      </div>
      <AlertDialogFooter></AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default SelectWordModal;
