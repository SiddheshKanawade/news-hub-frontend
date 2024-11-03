

export default function GeneralCategory({ onCategoriesChange }) {
    const userInput = (e) => {
        const selectedCategory = e.target.value;
        onCategoriesChange(selectedCategory);
    };
    return (
        <div className='categoryBtn'>
            <button onClick={userInput} value="general">General</button>
            <button onClick={userInput} value="politics">Politics</button>
            <button onClick={userInput} value="business">Business</button>
            <button onClick={userInput} value="entertainment">Entertainment</button>
            <button onClick={userInput} value="scienceandtechnology">Sci-Tech</button>
            <button onClick={userInput} value="sports">Sports</button>
        </div>
    )
}