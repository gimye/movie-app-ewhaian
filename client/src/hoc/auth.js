import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';
import { useNavigate } from 'react-router-dom';


const Auth = (SpecificComponent, option, adminRoute = null) => {

    function AuthenticaitonCheck(props) {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then(res => {
                console.log(res);

                if (!res.payload.isAuth) {
                    //1.로그인 하지 않은 상태
                    console.log("1.로그인 하지 않은 상태");

                    if (option) {
                        navigate("/login")
                    }

                } else {
                    //2.로그인 한 상태
                    console.log("2.로그인 하지 않은 상태");

                    if (adminRoute && !res.payload.isAdmin) {
                        navigate("/");
                    } else {
                        if (option === false)
                            navigate("/");
                    }
                }


            })

        }, []);

        return <SpecificComponent />
    }

    return AuthenticaitonCheck;
};

export default Auth;