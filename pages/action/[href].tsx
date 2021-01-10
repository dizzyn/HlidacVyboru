import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import action, { TActionDetail } from "../../crawler/action";
import { TDocument } from "../../crawler/documents";
import { createURL } from "../../crawler/utils";

const HlidacDocState = ({
  hlidac
}: {
  hlidac: any;
}) => <div>Máme</div>

const Hlidac = ({
  hlidac
}: {
  hlidac: any;
}) =>
  <table>
    <tbody>
      <tr>
        <th>ID</th>
        <td>{hlidac.dokumenty.map(document => <div>{JSON.stringify(document)}</div>)}</td>
      </tr>
    </tbody>
  </table>


const Documents = ({
  documents,
}: {
  documents: TDocument[];
}) => documents.map(({ title, type, documentUrl, sourceUrl, hlidacLink }) =>
  <tr key={documentUrl}>
    <td>{type}</td>
    <td><a href={documentUrl}>{title}</a></td>
    <td colSpan={1}>
      <a href={sourceUrl}>Zdroj dat</a>
    </td>
    <td colSpan={1}>
      {hlidacLink ? <a href={hlidacLink}>Na hlídači</a> : <div className="error">Nenní na hlídači</div>}
    </td>
  </tr>
)

const ActionPage = ({
  action: { hlidacId, committee, title, date, number, documents, sourceUrl, hlidacError },
}: {
  action: TActionDetail;
}) => {
  return (
    <Layout title={title}>
      <h1>{committee} - {title}</h1>
      <a href={sourceUrl}> Original site</a>
      <hr />

      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <td>{date}</td>
          </tr>
          <tr>
            <th>Číslo jednání</th>
            <td>{number}</td>
          </tr>
          <tr>
            <th>Dokumenty</th>
            <td>
              <table>
                <tbody>
                  <Documents documents={documents} />
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h4>Hlídač ({hlidacId})</h4>
      {hlidacError ? hlidacError : null}
      <hr />
      {/* {JSON.stringify(hlidac, null, 8)} */}
    </Layout>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uri = createURL(decodeURIComponent(String(context.params?.href)));
  const actionData = await action(uri)
  return {
    props: { action: actionData },
  };
};

export default ActionPage;
