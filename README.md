// multiple filteration (ratings with price) -- apifeatures in next js 
// search in page 2 of products is not good 

// react-pro-sidebar

// special food product - 635a54c60dd49b3e0493dcbb
// filter product | dashboard 
// edit filter bar 

//
import Spinner from 'react-bootstrap/Spinner';
<Spinner animation="border" variant="danger" />


//
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
<Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>{' '}
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>

  ================================================================
      <Rating
  name="hover-feedback"
  value={value}
  precision={0.5}
  getLabelText={getLabelText}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
  onChangeActive={(event, newHover) => {
    setHover(newHover);
  }}
  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
/>
{value !== null && (
  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
)}