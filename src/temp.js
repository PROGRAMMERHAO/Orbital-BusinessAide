{
  subtasks.map((task, index) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{task}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div>Task Description: {description[index + 1]}</div>
            <div>workers allocated: {workers[index + 1]}</div>
            <div>goal: {goal[index + 1]}</div>
            <div>
              {"progress"}
              <ProgressBar
                bgcolor={"#6a1b9a"}
                completed={(progress[index + 1] / goal) * 100}
              />
            </div>
            <div>status: {status[index + 1]}</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  });
}
