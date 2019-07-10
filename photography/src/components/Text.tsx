import React, { FunctionComponent } from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import Theme from "../constants/Theme";

interface TypographyProps extends TextProps {
    h1?: boolean,
    h2?: boolean,
    h3?: boolean,
    title?: boolean,
    header?: boolean,
    content?: boolean,
    bio?: boolean,
    caption?: boolean,
    small?: boolean,
    big?: boolean,
    size?: number,
    transform?: boolean,
    align?: boolean,
    marginTop?: number,
    regular?: boolean,
    bold?: boolean,
    semibold?: boolean,
    medium?: boolean,
    weight?: boolean,
    light?: boolean,
    center?: boolean,
    right?: boolean,
    spacing?: number, // letter-spacing
    height?: number, // line-height
    color?: string
}

const Typography: FunctionComponent<TypographyProps> = (props) => {

    const {
        h1,
        h2,
        h3,
        title,
        header,
        content,
        bio,
        caption,
        small,
        big,
        size,
        transform,
        align,
        marginTop,
        regular,
        bold,
        semibold,
        medium,
        weight,
        light,
        center,
        right,
        spacing, // letter-spacing
        height, // line-height
        color,
        style,
        children,
        ...rest
    } = props;

    const textStyles = [
        Theme.fonts.default,
        h1 && Theme.fonts.h1,
        h2 && Theme.fonts.h2,
        h3 && Theme.fonts.h3,
        title && Theme.fonts.title,
        header && Theme.fonts.header,
        content && Theme.fonts.content,
        bio && Theme.fonts.bio,
        caption && Theme.fonts.caption,
        small && Theme.fonts.small,
        big && Theme.fonts.big,
        size && { fontSize: size },
        transform && { textTransform: transform },
        align && { textAlign: align },
        marginTop && { marginTop },
        height && { lineHeight: height },
        spacing && { letterSpacing: spacing },
        weight && { fontWeight: weight },
        regular && styles.regular,
        bold && styles.bold,
        semibold && styles.semibold,
        medium && styles.medium,
        light && styles.light,
        center && styles.center,
        right && styles.right,
        color && { color },
        style && style // rewrite predefined styles
    ];

    return (
        <Text style={textStyles} {...rest}>
            {children}
        </Text>
    );
}
const styles = StyleSheet.create({
    // variations
    regular: {
        fontWeight: "normal",
    },
    bold: {
        fontWeight: "bold",
    },
    semibold: {
        fontWeight: "500",
    },
    medium: {
        fontWeight: "500",
    },
    light: {
        fontWeight: "200",
    },
    // position
    center: { textAlign: "center" },
    right: { textAlign: "right" },
});

export default Typography;