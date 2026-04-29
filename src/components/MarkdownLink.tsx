import { Link } from "react-router-dom";
import './MarkdownLink.css'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  children?: React.ReactNode;
};

const MarkdownLink: React.FC<Props> = ({ href = "", children, ...props }) => {
  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link to={href} className="markdown-internal-link">
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

export default MarkdownLink;
