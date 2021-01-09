import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import vybory, { TVybor } from "../crawler/vybory";



export const createURL = (path: string) => {

  return path && path.includes("sqw/")
    ? `https://www.psp.cz/${path ?? ""}`
    : `https://www.psp.cz/sqw/${path ?? ""}`
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
