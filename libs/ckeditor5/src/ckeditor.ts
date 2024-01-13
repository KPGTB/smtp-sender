/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import {ClassicEditor} from "@ckeditor/ckeditor5-editor-classic"

import {Alignment} from "@ckeditor/ckeditor5-alignment"
import {Autoformat} from "@ckeditor/ckeditor5-autoformat"
import {Bold, Code, Italic} from "@ckeditor/ckeditor5-basic-styles"
import {BlockQuote} from "@ckeditor/ckeditor5-block-quote"
import {CodeBlock} from "@ckeditor/ckeditor5-code-block"
import {Essentials} from "@ckeditor/ckeditor5-essentials"
import {FontSize} from "@ckeditor/ckeditor5-font"
import {Heading} from "@ckeditor/ckeditor5-heading"
import {Highlight} from "@ckeditor/ckeditor5-highlight"
import {HorizontalLine} from "@ckeditor/ckeditor5-horizontal-line"
import {
	AutoImage,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	ImageResize,
} from "@ckeditor/ckeditor5-image"
import {Indent} from "@ckeditor/ckeditor5-indent"
import {AutoLink, Link} from "@ckeditor/ckeditor5-link"
import {List} from "@ckeditor/ckeditor5-list"
import {MediaEmbed} from "@ckeditor/ckeditor5-media-embed"
import {Paragraph} from "@ckeditor/ckeditor5-paragraph"
import {PasteFromOffice} from "@ckeditor/ckeditor5-paste-from-office"
import {Table, TableToolbar} from "@ckeditor/ckeditor5-table"
import {TextTransformation} from "@ckeditor/ckeditor5-typing"
import {Base64UploadAdapter} from "@ckeditor/ckeditor5-upload"

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		Alignment,
		AutoImage,
		AutoLink,
		Autoformat,
		Base64UploadAdapter,
		BlockQuote,
		Bold,
		Code,
		CodeBlock,
		Essentials,
		FontSize,
		Heading,
		Highlight,
		HorizontalLine,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		Italic,
		Link,
		List,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		Table,
		TableToolbar,
		TextTransformation,
		ImageResize,
	]

	public static override defaultConfig = {
		toolbar: {
			items: [
				"undo",
				"redo",
				"|",
				"heading",
				"|",
				"fontSize",
				"bold",
				"italic",
				"highlight",
				"|",
				"bulletedList",
				"numberedList",
				"horizontalLine",
				"|",
				"alignment",
				"outdent",
				"indent",
				"|",
				"link",
				"code",
				"codeBlock",
				"blockQuote",
				"insertTable",
				"mediaEmbed",
				"uploadImage",
			],
		},
		language: "en",
		image: {
			toolbar: [
				"imageTextAlternative",
				"toggleImageCaption",
				"imageStyle:inline",
				"imageStyle:block",
				"imageStyle:side",
			],
		},
		table: {
			contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
		},
	}
}

export default Editor
