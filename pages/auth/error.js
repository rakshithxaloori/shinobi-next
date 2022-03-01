const Error = ({ error }) => {
  <div>
    <span>{error}</span>
  </div>;
};

export default Error;

export async function getServerSideProps(context) {
  const { query } = context;
  const { error } = query;
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