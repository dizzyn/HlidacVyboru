
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import vybor from "../../crawler/vybor";

interface TAction {
  title: string;
  href: string;
}

const IndexPage = ({ items, title }: { items: TAction[], title: string }) => (
  <Layout title={title}>
    <h1>{title}</h1>
    <ul>
      {items.map((i) => (
        <li><a href={`/action/${encodeURIComponent(i.href)}`}>{i.title}</a></li>
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

export default IndexPage;
