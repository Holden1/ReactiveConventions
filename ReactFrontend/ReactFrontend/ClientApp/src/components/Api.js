import React, { useEffect, useState } from "react";
import axios from "axios";

const useAuth0 = <TUser extends User = User>(): Auth0ContextInterface<TUser> =>
    useContext(Auth0Context) as Auth0ContextInterface<TUser>;

export default useAuth0;