import styled from 'styled-components';
import '@/animation.css';

type Props = {
  width: string;
  height: string;
};

const Skeleton = ({ width, height }: Props) => {
  return <SkeletonBox width={width} height={height} />;
};

export default Skeleton;

const SkeletonBox = styled.div<Props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: #e8e8e8;
  border-radius: 2px;
  animation: loading 2.5s infinite;
`;
