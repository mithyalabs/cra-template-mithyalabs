import React from 'react';
import { Theme, TypographyProps, Typography, Link } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export interface TypoProps extends TypographyProps {
    weight?: 'regular' | 'medium' | 'bold';
    underline?: boolean;
    contrast?: boolean;
    whiteSpace?: React.CSSProperties['whiteSpace'];
}

const Typo: React.FC<TypoProps> = (props) => {
    const {
        children,
        weight = 'regular',
        whiteSpace,
        underline = false,
        contrast = false,
        ...typographyProps
    } = props;
    const theme = useTheme();
    const style = {
        ...typographyProps.style,
        textDecoration: underline ? 'underline' : undefined,
        fontWeight: getFontWeight(theme, weight),
        whiteSpace,
        color: contrast ? 'white' : undefined,
    };

    if (typeof children === 'string' && isUrl(children)) {
        return (
            <Link
                rel="noopener"
                href={children}
                target="_blank"
                {...typographyProps}
                style={{ ...style, cursor: 'pointer' }}
            >
                {props.children}
            </Link>
        );
    }

    return (
        <Typography color="textPrimary" {...typographyProps} style={style}>
            {children}
        </Typography>
    );
};

const getFontWeight = (theme: Theme, weight: TypoProps['weight']) => {
    if (weight === 'bold') return theme.typography.fontWeightBold;
    if (weight === 'medium') return theme.typography.fontWeightMedium;
    if (weight === 'regular') return theme.typography.fontWeightRegular;
    return theme.typography.fontWeightRegular;
};

const isUrl = (text: string) => {
    return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi.test(
        text
    );
};

export default Typo;
