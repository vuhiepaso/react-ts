import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const err400 = (
  <>
    <div className="py-56 px-11">
      <div className="text-3xl font-bold">Invalid page</div>
      <div className="text-3xl ps-20">
        Status: <span className="text-5xl font-black">400</span>
      </div>
    </div>
  </>
);

const err404 = (
  <>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <>
          <Link to={"/"}>
            <Button type="primary">Back Home</Button>
          </Link>
        </>
      }
    />
  </>
);

export { err400, err404 };
