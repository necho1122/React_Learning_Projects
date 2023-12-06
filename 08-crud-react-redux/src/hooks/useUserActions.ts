import { userId, addNewUser, deleteUser } from "../store/users";
import { useAppDispatch } from "../hooks/store";

export const useUserActions = () => {

    const dispatch = useAppDispatch();

	const removeUser = (id: userId) => {
		dispatch(deleteUser(id));
	};

	const addUser = ({name, email, github}) => {
		dispatch(addNewUser({ name, email, github }));
	}

    return  { addUser, removeUser };
}