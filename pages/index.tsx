import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import vybory from "../crawler/vybory";


export const BASE_URL = "https://www.psp.cz/sqw/"
interface TVybor {
  title: string;
  href: string;
}

const IndexPage = ({ items }: { items: TVybor[] }) => (
  <Layout title="Výbory - seznam">
    <h1>Výbory</h1>
    <ul>
      {items.map((i) => (
        <li><a href={`/vybor/${encodeURIComponent(i.href)}`}>{i.title}</a></li>
      ))}
    </ul>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { items: await vybory() },
  };
};

export default IndexPage;
