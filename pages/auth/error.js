const Error = ({ error }) => {
  <div>
    <span>{error || "Something went wrong"}</span>
  </div>;
};

export default Error;

export async function getServerSideProps(context) {
  const error = context?.query?.error;
  switch (error) {
    case "AccessDenied":
      return {
        redirect: {
          destination: "/auth/signup",
          permanent: false,
        },
      };
    default:
      return { props: { error } };
  }
}
