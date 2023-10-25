import '@/animation.css';
import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

interface Props extends ComponentPropsWithRef<'div'> {
  width?: string;
  height?: string;
}

const Skeleton = ({ width, height, ...props }: Props) => {
  return <SkeletonBox width={width} height={height} {...props} />;
};

export default Skeleton;

const SkeletonBox = styled.div<Props>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: #e8e8e8;
  border-radius: 2px;
  animation: loading 2.5s infinite;
`;
