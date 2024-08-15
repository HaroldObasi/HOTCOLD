import {useState} from "react";
import StyledButton from "../LandingPage/Button";
import PlayModal from "../LandingPage/PlayModal";
import {socket} from "../../socket";
import {useSelector} from "react-redux";
import {RootState} from "../../state/PlayerStore";
import useSocketMessage, {ResponseData} from "../../hooks/useSocketMessage";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

type JoinRoomModalProps = {
  open: boolean;
  onClose: () => void;
  handleGoBack: () => void;
};

const validationSchema = Yup.object().shape({
  roomName: Yup.string().required("Room name is required"),
  roomMaxCapacity: Yup.number()
    .min(5, "Capacity must be at least 5")
    .max(10, "Capacity must be at most 10"),
  maxRounds: Yup.number()
    .min(1, "Must be at least 1 round")
    .max(5, "Must be at most 5 rounds"),
  private: Yup.boolean(),
  roundTime: Yup.number().min(1, "Round time must be at least 1 second")
});

const initialValues = {
  roomName: "",
  roomMaxCapacity: 5,
  maxRounds: 3,
  private: false,
  roundTime: 30
};

export default function CreateRoomModal({
  open,
  onClose,
  handleGoBack
}: JoinRoomModalProps) {
  const [roomName, setRoomName] = useState("");
  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const [playersSize, setPlayersSize] = useState(5);
  const playerName = useSelector((state: RootState) => state.player.userName);
  const casesToHandle = {
    room_create: (data: ResponseData) => console.log("room_create", data.status)
  };

  useSocketMessage("room_message", casesToHandle);

  function handleCreateRoom() {
    if (roomName.trim().length === 0) {
      alert("Please enter a room name!");
      return;
    }
    const data = {
      roomId: roomName,
      userName: playerName,
      isPrivateRoom,
      roomMaxCapacity: playersSize
    };

    console.log("data", data);
    socket.emit("create_room", data);
  }

  return (
    <PlayModal
      open={open}
      onClose={onClose}
      overlayClassName=" backdrop-blur [&>.relative]:max-w-[500px]"
    >
      <div className="py-4 px-3 flex items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("values", values);
          }}
        >
          {({isSubmitting}) => (
            <Form className="w-full sm:w-3/4 mx-auto font-denk ">
              <div className="justify-between flex items-center">
                <button
                  type="button"
                  className="text-xl  drop-shadow-lg"
                  onClick={handleGoBack}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h2 className="flex-grow text-center capitalize md:text-4xl text-[#2D2D2D] font-bold drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)] ">
                  create room
                </h2>
              </div>
              <div className="text-sm text-[#282828] ">
                <label
                  htmlFor="roomName"
                  className="capitalize block mb-1 font-bold text-xl"
                >
                  room name
                </label>
                <Field
                  type="text"
                  name="roomName"
                  placeholder="Enter Name"
                  className="py-1 px-3 w-full rounded h-8"
                />
                <ErrorMessage
                  name="roomName"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="roomMaxCapacity" className="capitalize text-xl">
                  max players
                </label>
                <Field as="select" name="roomMaxCapacity" className="ml-2">
                  {[5, 6, 7, 8, 9, 10].map((num) => (
                    <option value={num} key={num}>
                      {num}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="roomMaxCapacity"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="private" className="capitalize text-xl">
                  private
                </label>
                <Field
                  type="checkbox"
                  name="private"
                  className="w-4 h-4 ml-2 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="maxRounds" className="capitalize text-xl">
                  max rounds
                </label>
                <Field
                  type="number"
                  name="maxRounds"
                  className="py-1 px-3 w-full rounded h-8"
                />
                <ErrorMessage
                  name="maxRounds"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="roundTime" className="capitalize text-xl">
                  round time
                </label>
                <Field
                  type="number"
                  name="roundTime"
                  className="py-1 px-3 w-full rounded h-8"
                />
                <ErrorMessage
                  name="roundTime"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="text-center mt-4">
                <StyledButton
                  type="submit"
                  disabled={isSubmitting}
                  width="w-full"
                  paddingY="py-3"
                >
                  <span className="text-[#2D2D2D] uppercase">create</span>
                </StyledButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </PlayModal>
  );
}
