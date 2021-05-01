import {registerBlockType} from '@wordpress/blocks';
import { RadioControl } from '@wordpress/components';
import { RangeControl } from '@wordpress/components';
import { TextControl } from '@wordpress/components';
import { FontSizePicker } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('xymprice/xymprice', {
    apiVersion: 2,
    title: 'XYM Price',
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
                    <PanelBody title="価格の文字サイズ" initialOpen={ false } >
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
                    <PanelBody title="全体の文字サイズ" initialOpen={ false } >
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
                        label={ "価格の前" }
                        onChange={(newTextBefore)=>setAttributes({contentBefore: newTextBefore})}
                    />
                    <RadioControl
                        label="表示する価格"
                        help=""
                        selected={ currency }
                        options={ [
                            { label: 'ドル(USD)', value: 'usd' },
                            { label: '円(JPY)', value: 'jpy' },
                        ] }
                        onChange={(newValue)=>{setAttributes({currency: newValue})}}
                    />
                    <RangeControl
                        label="小数点表示桁数"
                        value={ floatnum }
                        onChange={ ( newNumber ) => setAttributes( { floatnum: newNumber } ) }
                        min={ 0 }
                        max={ 4 }
                    />
                    <TextControl
                        value={ contentAfter }
                        label={ "価格の後" }
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