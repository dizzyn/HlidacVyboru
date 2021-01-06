
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import vybor, { TVyborDetail } from "../../crawler/vybor";

const VyborPage = ({ actions, title }: TVyborDetail) => (
  <Layout title={title}>
    <h1>{title}</h1>
    <ul>
      {actions.map((i) => (
        <li><a href={`/action/${encodeURIComponent(i.href)}`}>{i.title}</a> - {i.date} - {i.desc}</li>
      ))}
    </ul>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log("HREF", decodeURIComponent(String(context.params?.href)))
  const uri = decodeURIComponent(String(context.params?.href))
  // console.log("a", await vybor(uri))
  return {
    props: { ...(await vybor(uri)) },
  };
};

export default VyborPage;
