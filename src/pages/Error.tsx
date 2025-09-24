import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-5">
      <h1 className="text-7xl font-bold">404</h1>
      <p className="text-lg max-w-96 text-center">
        Oops, it looks like the page you're looking for doesn't exist.
      </p>
      <Link to={ROUTES.LISTINGS}>
        <Button>Go to Homepage</Button>
      </Link>
    </div>
  );
};

export default Error;
