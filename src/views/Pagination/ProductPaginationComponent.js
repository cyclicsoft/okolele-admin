
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ProductPaginationComponent(props) {

  const classes = useStyles();
  const [productPage, setProductPage] = React.useState(1);

  const handleChangeProduct = (event, value) => {
    setProductPage(value);
    props.paginationHandlerProduct(value);
  };

  return (
    <div className={classes.root}>
      <Pagination count={props.totalProductPageCount} page={productPage} variant="outlined" color="primary" onChange={handleChangeProduct} />
    </div>
  );
}
