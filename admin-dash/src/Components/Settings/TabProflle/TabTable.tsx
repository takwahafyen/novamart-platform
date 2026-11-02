import { Table } from "reactstrap";

const TabTable = () => {
  return (
    <div className="tab-pane fade show active">
      <h5 className="f-w-600 f-16">Profile</h5>
      <div className="table-responsive profile-table">
        <Table className="table-responsive">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>Lazaar Design</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>lazaardesign21@gmail.com</td>
            </tr>
            <tr>
              <td>speciality</td>
              <td>Tout type d'impression numerique</td>
            </tr>
            
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TabTable;
