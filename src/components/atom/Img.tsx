import { ComponentPropsWithRef, Ref, forwardRef } from 'react';
import styled from 'styled-components';

interface Props extends ComponentPropsWithRef<'img'> {}

const Img = forwardRef(({ ...rest }: Props, ref: Ref<HTMLImageElement>) => {
  return <StyledImg ref={ref} {...rest} />;
});

export default Img;

const StyledImg = styled.img`
  object-fit: cover;
`;
