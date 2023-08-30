import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ComponentPropsWithoutRef } from 'react';

type Props = {
  content: string;
};

const MarkdownViewer = ({ content }: Props) => {
  return (
    <Viewer
      components={{ pre: CodeBlock, code: InlineCodeBlock, a: Anchor }}
      remarkPlugins={[remarkGfm]}
      children={content}
    />
  );
};

export default MarkdownViewer;

// styled HTML Tags
const Viewer = styled(ReactMarkdown)`
  all: initial;

  & * {
    all: revert;
  }
`;

const Pre = styled.pre`
  background-color: #ededed;
  padding: 2rem;
  line-height: 1.5rem;
  margin: 2rem auto;
  border-radius: 5px;

  & span {
    color: black;
    padding: 0;
  }
`;

const CodeBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <Pre>
      <code>{children}</code>
    </Pre>
  );
};

const InlineCode = styled.span`
  background-color: #ededed;
  color: #ea4d4d;
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
`;

const InlineCodeBlock = ({ children }: { children: React.ReactNode }) => {
  return <InlineCode>{children}</InlineCode>;
};

const A = styled.a`
  text-decoration: none;
  color: #1c58d0;
`;

const Anchor = ({
  children,
  ...rest
}: { children: React.ReactNode } & ComponentPropsWithoutRef<'a'>) => {
  return <A {...rest}>{children}</A>;
};
