import {registerBlockType} from '@wordpress/blocks';
import { RadioControl } from '@wordpress/components';
import { RangeControl } from '@wordpress/components';
import { TextControl } from '@wordpress/components';
import { FontSizePicker } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

registerBlockType('xymprice/xymprice', {
    apiVersion: 2,
    title: __( 'XYM Price', 'xymprice' ),
    icon: 'chart-line',
    category: 'common',
    attributes: {
        contentBefore: {
            type: 'string',
        },
        contentAfter: {
            type: 'string',
        },
        currency: {
            type: 'string',
        },
        fontSize: {
            type: 'number',
        },
        fontSizeb: {
            type: 'number',
        },
        floatnum: {
            type: 'number',
        },
    },

    edit: ( props ) => {
        const {
            className,
            attributes: {
                contentBefore,
                contentAfter,
                currency,
                floatnum,
                fontSize,
                fontSizeb
            },
            setAttributes,
        } = props;
        const blockProps = useBlockProps( {
            className: className,
        } );
        return (
            <>
                <InspectorControls>
                    <PanelBody title={ __( 'Price Font Size', 'xymprice' ) } initialOpen={ false } >
                        <FontSizePicker
                            value={ fontSize }
                            onChange={ ( size ) => {
                                if( ! size ) {
                                    size = 16;
                                }
                                setAttributes( { fontSize: size } ) } }
                            withSlider
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Message Font Size', 'xymprice' ) } initialOpen={ false } >
                        <FontSizePicker
                            value={ fontSizeb }
                            onChange={ ( size ) => {
                                if( ! size ) {
                                    size = 12;
                                }
                                setAttributes( { fontSizeb: size } ) } }
                            withSlider
                        />
                    </PanelBody>
                </InspectorControls>
                <div { ...blockProps}>
                    <TextControl
                        value={ contentBefore }
                        label={ __( 'Message before Price', 'xymprice' ) }
                        onChange={(newTextBefore)=>setAttributes({contentBefore: newTextBefore})}
                    />
                    <RadioControl
                        label={ __( 'Price Unit', 'xymprice' ) }
                        help=""
                        selected={ currency }
                        options={ [
                            { label: __( 'USD', 'xymprice' ), value: 'usd' },
                            { label: __( 'JPY', 'xymprice' ), value: 'jpy' },
                        ] }
                        onChange={(newValue)=>{setAttributes({currency: newValue})}}
                    />
                    <RangeControl
                        label={ __( 'Number of decimal places', 'xymprice' ) }
                        value={ floatnum }
                        onChange={ ( newNumber ) => setAttributes( { floatnum: newNumber } ) }
                        min={ 0 }
                        max={ 4 }
                    />
                    <TextControl
                        value={ contentAfter }
                        label={ __( 'Message after Price', 'xymprice' ) }
                        onChange={(newTextAfter)=>setAttributes({contentAfter: newTextAfter})}
                    />
                </div>
            </>
        );
    },

    save: ( props ) => {
        const {
            className,
            attributes: {
                contentBefore,
                contentAfter,
                currency,
                floatnum,
                fontSize,
                fontSizeb
            },
        } = props;
        const blockProps = useBlockProps.save( {
            className: className,
            style: { fontSize: `${fontSizeb}px` },
        } );
        const innerblockProps = useBlockProps.save( {
            className: 'xymprice',
            style: { fontSize: `${fontSize}px` },
            'data-num': floatnum,
            'data-currency': currency,
        } );
        return (<div { ...blockProps}>{contentBefore}<span {...innerblockProps}></span>{contentAfter}</div>);
    },
});