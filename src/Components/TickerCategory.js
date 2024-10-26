import { useEffect } from "react";
import Choices from "choices.js";

export default function TickerCategory({ onCategoriesChange }) {  // Receive a callback prop


    useEffect(() => {
        const categoryElement = document.getElementById('category');

        const choices = new Choices(categoryElement, {
            delimiter: ',',
            editItems: true,
            removeItemButton: true,
            placeholderValue: 'Select categories...',
            searchEnabled: true,
        });

        const categories = ['business', 'technology', 'entertainment', 'general', 'health', 'science', 'sports'];

        // Populate Choices.js with fetched options
        choices.setChoices(
            categories.map((category) => ({
                value: category,
                label: category.charAt(0).toUpperCase() + category.slice(1),
            })),
            'value',
            'label',
            true
        );

        categoryElement.addEventListener('change', () => {
            const selectedCategories = choices.getValue(true);
            onCategoriesChange(selectedCategories);
        });

        return () => {
            choices.destroy();  // Clean up Choices.js instance when component is unmounted
        };
    }, []);

    return (
        <div className="tickerCategory">
            <label htmlFor="category">Categories:</label>
            <select id="category" multiple placeholder="Select categories..."></select>
        </div>
    );
}
