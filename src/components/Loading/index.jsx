import { Load, LoadingWrapper } from "./style";

const Loading = () => {
    return (
        <LoadingWrapper>
            <Load className="loader"></Load>
        </LoadingWrapper>
    );
}

export default Loading;