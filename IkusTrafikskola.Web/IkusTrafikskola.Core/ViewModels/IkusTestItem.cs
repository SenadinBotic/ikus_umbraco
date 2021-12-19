namespace IkusTrafikskola.Core.ViewModels
{
    public class IkusTestItem
    {
        public string QuestionAnswer { get; set; }
        public bool CorrectAnswer { get; set; }
        public int Id { get; set; }

        public IkusTestItem(string questionAnswer, bool correctAnswer, int id)
        {
            QuestionAnswer = questionAnswer;
            CorrectAnswer = correctAnswer;
            Id = id;
        }
    }
}
