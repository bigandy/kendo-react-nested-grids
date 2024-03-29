import * as React from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import products from "./products.json";

const DetailComponent = (props) => {
  const dataItem = props.dataItem;
  return (
    <>
      <section>
        <p>
          <strong>In Stock:</strong> {dataItem.UnitsInStock} units
        </p>
        <p>
          <strong>On Order:</strong> {dataItem.UnitsOnOrder} units
        </p>
        <p>
          <strong>Reorder Level:</strong> {dataItem.ReorderLevel} units
        </p>
        <p>
          <strong>Discontinued:</strong> {dataItem.Discontinued}
        </p>
        <p>
          <strong>Category:</strong> {dataItem.Category.CategoryName} -{" "}
          {dataItem.Category.Description}
        </p>
      </section>
      <GridComponent level={props.level} />
    </>
  );
};

const GridComponent = ({ level = 1 }) => {
  const [data, setData] = React.useState(
    products.map((item) => ({ ...item, expanded: false }))
  );

  const expandChange = (event) => {
    let newData = data.map((item) => {
      if (item.ProductID === event.dataItem.ProductID) {
        item.expanded = !event.dataItem.expanded;
      }
      return item;
    });
    setData(newData);
  };

  return (
    <Grid
      data={data}
      detail={
        level < 4
          ? (props) => <DetailComponent {...props} level={level + 1} />
          : null
      }
      style={{
        height: "400px",
      }}
      expandField="expanded"
      onExpandChange={expandChange}
    >
      <Column field="ProductName" title="Product" width="300px" />
      <Column field="ProductID" title="ID" width="50px" />
      <Column field="UnitPrice" title="Unit Price" width="100px" />
      <Column field="QuantityPerUnit" title="Qty Per Unit" />
    </Grid>
  );
};

const App = () => {
  return <GridComponent />;
};
ReactDOM.render(<App />, document.querySelector("my-app"));
