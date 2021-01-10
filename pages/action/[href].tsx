import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import action, { TActionDetail, THlidacOnlyDocs } from "../../crawler/action";
import { TDocument } from "../../crawler/documents";
import { createHlidacJsonLink, createHlidacLink, createURL } from "../../crawler/utils";

const Documents = ({
  documents,
  hlidacOnlyDocuments
}: {
  documents: TDocument[];
  hlidacOnlyDocuments: THlidacOnlyDocs[];
}) => {

  const docRnds = documents.map(({ title, type, documentUrl, sourceUrl, hlidacLink }) => <tr key={documentUrl}>
    <td>{type}</td>
    <td><a href={documentUrl}>{title}</a></td>
    <td colSpan={1}>
      <a href={sourceUrl}>Zdroj dat</a>
    </td>
    <td colSpan={1}>
      {hlidacLink ? <a href={hlidacLink}>Na hlídači</a> : <div className="error">Není na hlídači</div>}
    </td>
  </tr>)
  // console.log("Zde", hlidacOnlyDocuments)
  const docHlidacOnlyRnds = hlidacOnlyDocuments.map(({ title, documentUrl, hlidacLink }) => <tr key={documentUrl}>
    <td><a href={documentUrl}>{title}</a></td>
    <td><a href={hlidacLink}>Na hlídači</a></td>
  </tr>)

  return <>
    {docRnds}
    {docHlidacOnlyRnds.length
      ? <><div className="error">Dokumenty nalezené pouze na hlídači</div>{docHlidacOnlyRnds}</>
      : null}
  </>
}


const ActionPage = ({
  action: { hlidacId, committee, title, date, number, documents, sourceUrl, hlidacError, hlidacOnlyDocuments },
}: {
  action: TActionDetail;
}) => {
  return (
    <Layout title={title}>
      <h1>{committee} - {title}</h1>
      <a href={sourceUrl}> Original site</a> |
      Hlídač: {hlidacError ? <span className="error">{hlidacError}</span> : <span>
        <a href={createHlidacLink(hlidacId)}>Web</a> /
        <a href={createHlidacJsonLink(hlidacId)}>JSON</a>
      </span>}

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
          {/* <tr>
            <th>Záznam</th>
            <td>{recorUrl ? <a href={recorUrl}>MP3</a> : "-"}
            </td>
          </tr> */}
          <tr>
            <th>Dokumenty</th>
            <td>
              <table>
                <tbody>
                  <Documents documents={documents} hlidacOnlyDocuments={hlidacOnlyDocuments} />
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
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
