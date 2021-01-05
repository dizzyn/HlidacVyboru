
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import action from "../../crawler/action";

interface TActionDetail {
  title: string;
  href: string;
}

const IndexPage = ({ action: { title } }: { action: TActionDetail }) => (
  <Layout title={title}>
    <h1>{title}</h1>
    Datum jednání	6. ledna 2021
    Číslo jednání	47
    Projednávané dokumenty:
    <ul>
      {/* {items.map((i) => (
        <li><a href={`/vybor/${encodeURIComponent(i.href)}`}>{i.title}</a></li>
      ))} */}
    </ul>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log("HREF", decodeURIComponent(String(context.params?.href)))
  const uri = decodeURIComponent(String(context.params?.href))
  return {
    props: { action: await action(uri) },
  };
};

export default IndexPage;
