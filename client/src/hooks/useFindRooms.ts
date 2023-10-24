import axios from "axios";
import {useEffect, useState} from "react";
import { socket } from "../socket";
import { ResponseData } from "./useSocketMessage";
type Room = {
  id: string;
  players: string;
  roomMaxCapacity: number;
  host: string;
};
export default function useFindRooms(visible: boolean) {
  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const [fetchError, setFetchError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const {data} = await axios.get("http://localhost:5000/api/rooms/all");
      setRoomsData(data.rooms);
      setLoading(false);
    } catch (error) {
      setFetchError(error as Error);
      setLoading(false);
    }
  };

  const refetchRoom = () => {
    fetchRooms();
  };

  useEffect(() => {
    if (visible) fetchRooms();
  }, [visible]);

  useEffect(()=>{
    roomsData.forEach(room =>{
      socket.on(`room-${room.id}-update`, (data:ResponseData) => {
        setRoomsData((prev) => {
          const index = prev.findIndex((r) => r.id === room.id);
          const newRooms = [...prev];
          newRooms[index] = data.payload as Room;
          return newRooms;
        });
      });
    })

    return ()=>{
      roomsData.forEach(room =>{
        socket.off(`room-${room.id}-update`);
      })
    }
    

  },[roomsData])

  return {roomsData, fetchError, loading, refetchRoom};
}
