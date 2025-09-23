import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Error = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-full flex-col gap-5">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="text-lg max-w-96 text-center">
          Oops, it looks like the page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button>Go to Homepage</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Error;
