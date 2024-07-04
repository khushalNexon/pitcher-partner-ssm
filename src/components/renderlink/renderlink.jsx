import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RenderLink({ url, label, inNewTab = false, ...params }) {
  return (
    <Link {...params} href={url} underline="hover" rel="noopener">
      {label}
    </Link>
  );
}

RenderLink.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
  inNewTab: PropTypes.bool,
};

export default RenderLink;
