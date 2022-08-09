import { Helmet } from "react-helmet";
const Title = ({ children }) => {
  console.log(children);
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{children}</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
  );
};

export default Title;
