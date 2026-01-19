import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import MESSlice from "./slices/ManagerEmployeeSupervisorListSlice";
import EmployeeTopicDataSlice from "./slices/EmployeeTopicDataSlice";
import UserDetailsSlice from "./slices/UserDetailsSlice";
import UniversalLoader from "./slices/UniversalLoader";
import NavBarSlice from "./slices/NavbarSlice";

const store = configureStore({
  reducer: {
    userSlice: UserSlice,
    MESSlice: MESSlice,
    EmployeeTopicDataSlice: EmployeeTopicDataSlice,
    UserDetailsSlice: UserDetailsSlice,
    UniversalLoader: UniversalLoader,
    NavBarSlice: NavBarSlice,
  },
});

export default store;
