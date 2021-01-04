
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import vybor from "../../crawler/vybor";

interface TEvent {
  title: string;
  href: string;
}

const IndexPage = ({ items }: { items: TEvent[] }) => (
  <Layout title="Výbory - seznam">
    <h1>Výbory</h1>
    <ul>
      {items.map((i) => (
        <li><a href={`/vybor/${encodeURIComponent(i.href)}`}>{i.title}</a></li>
      ))}
    </ul>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log("HREF", decodeURIComponent(String(context.params?.href)))
  const uri = decodeURIComponent(String(context.params?.href))
  return {
    props: { items: await vybor(uri) },
  };
};

export default IndexPage;
