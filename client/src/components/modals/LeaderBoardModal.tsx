import {
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../ui/alert-dialog";
import {RootState} from "../../state/PlayerStore";
import {useSelector} from "react-redux";

const LeaderBoardModal = () => {
  const {info} = useSelector((state: RootState) => state.ui.modal);
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center">Game Ended!</AlertDialogTitle>
      </AlertDialogHeader>
      <div>
        <p className="text-center">Leaderboard</p>
        <div className="flex justify-between">
          <p className="font-bold">Player</p>
          <p className="font-bold">Score</p>
        </div>
        {info.map((item: any, key: any) => (
          <div key={key} className="flex justify-between">
            <p>{item.userName}</p>
            <p>{item.score}</p>
          </div>
        ))}
        {/* {info} */}
      </div>
      <AlertDialogFooter></AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default LeaderBoardModal;
