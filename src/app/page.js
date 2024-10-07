import {useRouter} from "next/navigation";
import {useEffect} from "react";

const PageIndex = () => {
    const router = useRouter();
    useEffect(() => {
        router.replace('/portal');
    });

    return (
        <></>
    )
}
export default PageIndex