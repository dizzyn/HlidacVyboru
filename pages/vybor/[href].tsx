import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import vybor, { TVyborDetail } from "../../src/crawler/vybor";

const VyborPage = ({ actions, title, uri }: TVyborDetail & { uri: string }) => {

  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <a href={uri}>Source</a>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((i) => (
            <tr key={i.href}>
              <td>
                <a href={`/action/${encodeURIComponent(i.href)}`}>{i.title}</a>
              </td>
              <td>{i.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uri = decodeURIComponent(String(context.params?.href));
  const data = await vybor(uri)
  return {
    props: { ...data, uri },
  };
};

export default VyborPage;
