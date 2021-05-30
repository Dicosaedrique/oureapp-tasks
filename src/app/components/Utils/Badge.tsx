import styled from 'styled-components/macro';

const Badge = styled.span`
    border-radius: 0.5em;
    color: #ffffff;
    padding: 0.15em 0.65em;
    font-size: 0.8em;
    cursor: pointer;
    user-select: none;
    margin: 0 0.3em;
    white-space: pre;

    &:hover {
        opacity: 0.9;
    }
`;

export default Badge;
