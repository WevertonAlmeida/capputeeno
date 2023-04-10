import React from 'react';
import styled from "styled-components";

const Loader = styled.div` 
	display: inline-block;
	position: relative;
	width: 64px;
	height: 64px;

	&-container {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		span {
			color: #333;
			margin-bottom: 50px;
		}
	}

	div {
		position: absolute;
		border: 4px solid #333;
		opacity: 1;
		border-radius: 50%;
		animation: loader 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

		&:nth-child(2) {
			animation-delay: -0.5s;
		}
	}

    @keyframes loader {
        0% {
            top: 28px;
            left: 28px;
            width: 0;
            height: 0;
            opacity: 1;
        }

        100% {
            top: -1px;
            left: -1px;
            width: 58px;
            height: 58px;
            opacity: 0;
        }
    }
`;

function AppLoader() {

    return (
        <Loader>
            
        </Loader>
    );
}

export default AppLoader;